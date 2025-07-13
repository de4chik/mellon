import JWT from "jsonwebtoken";

export const generateJWT = (payload: object) => {
  const accessToken = JWT.sign({ ...payload }, process.env.JWT_KEY_ACCESS!, {
    expiresIn: "24h",
  });
  const refreshToken = JWT.sign({ ...payload }, process.env.JWT_KEY_REFRESH!, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};
