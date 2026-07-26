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

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const validation = registerSchema.safeParse({
    name,
    email,
    password,
  });

  if (validation.success) {
    const existingUser = await prisma.user.findUnique({
      where: { email: validation.data.email.trim().toLowerCase() },
    });

    if (existingUser)
      return {
        success: false,
        message: "Email already exists",
        code: RESPONSE_CODES.CONFLICT,
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
      message: "An email has been sent to verify you account",
      code: RESPONSE_CODES.CREATED,
      user,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.CONFLICT,
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
      message: "Missing required fields: token or userId.",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing)
    return {
      success: false,
      message: "User Not Found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  if (existing.emailVerified)
    return {
      success: false,
      message: "Account already verified",
      code: RESPONSE_CODES.OK,
    };

  await prisma.user.update({
    where: { id: userId },
    data: { verificationToken: null, emailVerified: new Date() },
  });

  return {
    success: true,
    message: "Account verified successfully",
    code: RESPONSE_CODES.OK,
  };
};

export const generateToken = async (email: string) => {
  
  const findUser = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true, email: true },
  });
  if (findUser?.email === undefined)
    return {
      success: false,
      message: "User Not Found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  const token: string = crypto.randomBytes(36).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await prisma.reset_password_token.deleteMany({
    where: { userId: findUser.id },
  });

  await prisma.reset_password_token.create({
    data: {
      userId: findUser.id,
      token: token,
      expiresAt,
    },
  });

  return {
    success: true,
    message: "A forgot password email has been sent",
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
      message: "Invaild Request",
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
        message: "Reset Password Link Expired",
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
      message: "Password has been reset successfully",
    };
  }

  return {
    success: false,
    code: RESPONSE_CODES.BAD_REQUEST,
    message: "Please check the password",
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
      message: "Invaild Request",
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
        message: "User is not exist",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    const isValid = await bcrypt.compare(
      validation.data.oldPassword,
      findUser.password!,
    );
    if (!isValid)
      return {
        success: false,
        message: "Password is not correct",
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
      message: "Password updated successfully",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    code: RESPONSE_CODES.BAD_REQUEST,
    message: "Please check the entered passwords",
  };
};

export const updateRole = async (userId: string, newRole: UserRoles) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing)
    return {
      success: false,
      message: "User Not Found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });
  return {
    success: true,
    message: "Role Updated Successfully",
    code: RESPONSE_CODES.OK,
  };
};

export const deleteUser = async (userId: string) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing)
    return {
      success: false,
      message: "User Not Found",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  await prisma.user.delete({ where: { id: userId } });
  return {
    success: true,
    message: "User Deleted Successfully",
    code: RESPONSE_CODES.OK,
  };
};

export const getAllUsers = async () => {
  const result = await prisma.user.findMany({});
  return {
    data: result,
    success: true,
    message: "All Users",
    code: RESPONSE_CODES.OK,
  };
};

export const getUserById = async (userId: string) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing)
    return {
      success: false,
      message: "User Not Found",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  const result = await prisma.user.findUnique({ where: { id: userId } });
  return {
    data: result,
    success: true,
    message: `The User With This ID: ${userId}`,
    code: RESPONSE_CODES.OK,
  };
};
