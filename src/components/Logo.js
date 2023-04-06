const Logo = ({ collapsed }) => {
  return (
    <div className="logo">
      <div className="image-container">
        <img style={{ marginRight: !collapsed ? "10px" : "0px" }} src="/logo.png" alt="pebble-logo" />
        {!collapsed ? <>Pebble</> : null}
      </div>
    </div>
  );
};

export default Logo;
