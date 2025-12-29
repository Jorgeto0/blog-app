function Expiration({ expiresAt }) {
  const expires = new Date(expiresAt);
  const now = new Date();
  const diffMs = expires - now;

  if (diffMs <= 0) {
    return <span className="expiration expired">Expired</span>;
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  return (
    <span className="expiration active">
      {hours}h {minutes}m remaining
    </span>
  );
}

export default Expiration;
