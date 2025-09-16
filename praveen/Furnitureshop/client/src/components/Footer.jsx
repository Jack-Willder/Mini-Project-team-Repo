// src/components/Footer.js
function Footer() {
    const date=new Date();
    const year=date.getFullYear();
  return (
      <div className="footer">
        <p className="foot">Copyright © {new Date().getFullYear()} | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
      </div>
  );
}

export default Footer;
