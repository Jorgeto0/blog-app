function Avatar({ currentUser }) {
  if (!currentUser) return null;

  return (
    <div className="header">
      <img
        src={currentUser.image}
        alt="User avatar"
        className="avatar"
      />
      <span>{currentUser.name}</span>
    </div>
  );
}

export default Avatar;