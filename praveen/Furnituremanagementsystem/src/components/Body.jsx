import image1 from '../assets/images/image1.jpg';

function Body(){
    return(
<div className="body-center">
  <div className="frcontent">
    <div className="quote">
Transform your space with timeless elegance     </div>
    <button className="explore-btn">Explore</button>
  </div>
  <img src={image1} alt="Furniture" />
</div>

    )
}
export default Body;