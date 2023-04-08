const Card = ({ children, icon, className }) => {
  return (
    <div className={`information-card ${className}`}>
      <div className="card-body">
        <div className="icon">{icon}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
