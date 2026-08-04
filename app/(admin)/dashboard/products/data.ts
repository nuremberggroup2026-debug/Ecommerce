
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


export const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728wd52f",
    amount: 140,
    status: "processing",
    email: "john@example.com",
  },
  {
    id: "728cd52f",
    amount: 120,
    status: "success",
    email: "sara@example.com",
  },
  {
    id: "728vd52f",
    amount: 150,
    status: "failed",
    email: "alex@example.com",
  },
  {
    id: "821ab91x",
    amount: 350,
    status: "success",
    email: "emma@example.com",
  },
  {
    id: "915kd20q",
    amount: 89,
    status: "pending",
    email: "david@example.com",
  },
  {
    id: "102pl67m",
    amount: 560,
    status: "processing",
    email: "olivia@example.com",
  },
  {
    id: "564xy11n",
    amount: 75,
    status: "failed",
    email: "liam@example.com",
  },
  {
    id: "889tt33z",
    amount: 999,
    status: "success",
    email: "noah@example.com",
  },
  {
    id: "431gh82k",
    amount: 220,
    status: "pending",
    email: "mia@example.com",
  },
  {
    id: "777hj55a",
    amount: 430,
    status: "processing",
    email: "james@example.com",
  },
  {
    id: "290qw91b",
    amount: 60,
    status: "failed",
    email: "lucas@example.com",
  },
  {
    id: "651nm22v",
    amount: 180,
    status: "success",
    email: "ava@example.com",
  },
  {
    id: "843er90p",
    amount: 710,
    status: "processing",
    email: "isabella@example.com",
  },
  {
    id: "109zx44c",
    amount: 55,
    status: "pending",
    email: "ethan@example.com",
  },
  {
    id: "390bn88r",
    amount: 1250,
    status: "success",
    email: "charlotte@example.com",
  },
  {
    id: "502jk66l",
    amount: 310,
    status: "failed",
    email: "amelia@example.com",
  },
  {
    id: "664rt11s",
    amount: 470,
    status: "processing",
    email: "henry@example.com",
  },
  {
    id: "775yu45d",
    amount: 205,
    status: "pending",
    email: "harper@example.com",
  },
  {
    id: "998op77f",
    amount: 845,
    status: "success",
    email: "logan@example.com",
  },
];