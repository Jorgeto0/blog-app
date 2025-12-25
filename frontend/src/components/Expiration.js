function Expiration({ expiresAt }) {
  const expires = new Date(expiresAt);
  const now = new Date();
  const diffMs = expires - now;

  if (diffMs <= 0) {
    return <p style={{ color: 'red' }}>Expired</p>;
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  return (
    <p style={{ color: 'orange' }}>
      Expires in {hours}h {minutes}m
    </p>
  );
}

export default Expiration;
