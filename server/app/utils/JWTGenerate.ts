import JWT from "jsonwebtoken";

export const generateTokens = (userId: string) => {
  const access = JWT.sign(
    { _id: userId },
    process.env.JWT_SECRET_KEY_ACCESS_TOKEN!,
    {
      expiresIn: "24h",
    }
  );
  const refresh = JWT.sign(
    { _id: userId },
    process.env.JWT_SECRET_KEY_REFRESH_TOKEN!,
    {
      expiresIn: "30d",
    }
  );

  return { access, refresh };
};
