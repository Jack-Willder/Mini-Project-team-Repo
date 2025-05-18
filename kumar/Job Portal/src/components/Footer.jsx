function Footer()
{
    return(
        <footer className="footer mt-40">
            <div className="footer1 bg-green-300 py-3">
                <div className="part-1 mr-3">
                    <h3 className="font-bold mb-4 text-center">About Us</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos nisi minima molestias cum culpa necessitatibus fugiat voluptate, rerum qui.</p>
                </div>
                <div className="part2">
                    <h3 className="font-bold mb-4 text-center">Contact Us</h3>
                    <b>Ph.No : 1234567890</b><br/>
                    <b>Email : xyz@gmail.com</b><br/>
                </div>
                <div className="part2">
                    <h3 className="font-bold mb-4 text-center">Links</h3>
                    <li><a href=""><b>Home</b></a></li>
                    <li><a href=""><b>Jobs</b></a></li>
                    <li><a href=""><b>About Us</b></a></li>
                    <li><a href=""><b>Contact Us</b></a></li>
                </div>
            </div>
            <div className="footer2 text-center py-3">
                <p><b>Online Job Portal | Designed By <a href="">RK</a></b></p> 
            </div>
        </footer>
    )    
}

export default Footer