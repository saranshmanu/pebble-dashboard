const Card = ({ children, icon }) => {
  return (
    <div className="information-card">
      <div className="card-body flex-expand">
        <div className="icon">{icon}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
