import { prisma } from "@/lib/prisma";
import {
  changePasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { sendVerificationEmail } from "@/lib/emails/send-verification";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserRoles } from "@/types";
import { sendPasswordResetEmail } from "@/lib/emails/send-reset-password-email";

export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const validation = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  console.log("validation: ", validation);

  if (validation.success) {
    const existingUser = await prisma.user.findUnique({
      where: { email: validation.data.email.trim().toLowerCase() },
    });

    if (existingUser)
      return {
        success: false,
        message: "EMAIL_ALREADY_EXISTS",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    const numberOfUsers = await prisma.user.count();
    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Register the user
    const user = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email.trim().toLowerCase(),
        password: hashedPassword,
        role: numberOfUsers === 0 ? "super_admin" : "user",
        verificationToken,
      },
    });

    // send verification email
    await sendVerificationEmail({
      email: user.email,
      name: user.name,
      userId: user.id,
      verifircationToken: verificationToken,
    });

    return {
      success: true,
      message: "VERIFICATION_EMAIL_SENT_SUCCESSFULLY",
      code: RESPONSE_CODES.CREATED,
      user,
    };
  }

  return {
    success: false,
    message: "VALIDATION_ERROR",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};
export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password!);

  if (!isValid) return null;

  return user;
};

export const verifyEmail = async (userId: string, token: string) => {
  if (!userId || !token)
    return {
      success: false,
      message: "MISSING_REQUIRED_FIELDS",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing)
    return {
      success: false,
      message: "USER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  if (existing.emailVerified)
    return {
      success: true,
      message: "ACCOUNT_ALREADY_VERIFIED",
      code: RESPONSE_CODES.OK,
    };

  await prisma.user.update({
    where: { id: userId },
    data: { verificationToken: null, emailVerified: new Date() },
  });

  return {
    success: true,
    message: "ACCOUNT_VERIFIED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const generateToken = async (email: string) => {
  const findUser = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true, email: true, name: true },
  });

  if (findUser?.email === undefined)
    return {
      success: false,
      message: "USER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  const token: string = crypto.randomBytes(36).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await prisma.reset_password_token.deleteMany({
    where: { userId: findUser.id },
  });

  const resetPasswordToken = await prisma.reset_password_token.create({
    data: {
      userId: findUser.id,
      token: token,
      expiresAt,
    },
  });

  await sendPasswordResetEmail({
    email: findUser.email,
    name: findUser.name,
    resetToken: resetPasswordToken.token,
  });

  return {
    success: true,
    message: "FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    token,
  };
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string,
) => {
  if (!token || !password)
    return {
      success: false,
      message: "INVALID_REQUEST",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = resetPasswordSchema.safeParse({
    password,
    confirmPassword,
  });

  if (validation.success) {
    const resetToken = await prisma.reset_password_token.findFirst({
      where: { token: token, expiresAt: { gt: new Date() } },
    });

    if (resetToken?.token === undefined || resetToken.userId === null)
      return {
        success: false,
        message: "RESET_PASSWORD_LINK_EXPIRED",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    const newHashPassword = await bcrypt.hash(validation.data.password, 10);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: {
        password: newHashPassword,
      },
    });

    await prisma.reset_password_token.delete({
      where: { id: resetToken.id },
    });

    return {
      success: true,
      code: RESPONSE_CODES.OK,
      message: "PASSWORD_RESET_SUCCESSFULLY",
    };
  }

  return {
    success: false,
    code: RESPONSE_CODES.BAD_REQUEST,
    message: "INVALID_PASSWORD",
  };
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  userId: string,
) => {
  if (!oldPassword || !newPassword || !confirmPassword)
    return {
      success: false,
      message: "INVALID_REQUEST",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = changePasswordSchema.safeParse({
    newPassword,
    confirmPassword,
    oldPassword,
  });

  if (validation.success) {
    const findUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (findUser === null)
      return {
        success: false,
        message: "USER_NOT_FOUND",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    const isValid = await bcrypt.compare(
      validation.data.oldPassword,
      findUser.password!,
    );

    if (!isValid)
      return {
        success: false,
        message: "INCORRECT_PASSWORD",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    const hashedpassword = await bcrypt.hash(validation.data.newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedpassword,
      },
    });

    return {
      success: true,
      message: "PASSWORD_UPDATED_SUCCESSFULLY",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    code: RESPONSE_CODES.BAD_REQUEST,
    message: "INVALID_PASSWORDS",
  };
};

export const updateRole = async (userId: string, newRole: UserRoles) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing)
    return {
      success: false,
      message: "USER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  return {
    success: true,
    message: "ROLE_UPDATED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const deleteUser = async (userId: string) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing)
    return {
      success: false,
      message: "USER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.user.delete({ where: { id: userId } });

  return {
    success: true,
    message: "USER_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const getAllUsers = async () => {
  const result = await prisma.user.findMany({});

  return {
    data: result,
    success: true,
    message: "USERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const getUserById = async (userId: string) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing)
    return {
      success: false,
      message: "USER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  const result = await prisma.user.findUnique({ where: { id: userId } });

  return {
    data: result,
    success: true,
    message: "USER_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};
