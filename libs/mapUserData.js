export const mapUserData = async (user) => {
  const { uid, email, emailVerified, displayName } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
  };
  // const { user_id, email, email_verified } = user;
  // const token = await user.getIdToken(true);
  // return {
  //   id: user_id,
  //   email,
  //   token,
  // };
};
