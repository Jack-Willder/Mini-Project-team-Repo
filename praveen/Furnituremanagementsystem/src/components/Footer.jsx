// src/components/Footer.js
function Footer() {
    const date=new Date();
    const year=date.getFullYear();
  return (
<div className="footer">
    <p className="foot">Copyright © {year}| Designed by Praveen</p>
</div>
  );
}

export default Footer;
