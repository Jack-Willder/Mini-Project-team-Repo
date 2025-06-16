import Footer from "../components/Footer"
import PageHeader from "../components/PageHeader"

function Contact(){
    return(
        <>
        <PageHeader/>
        <section className="contactbanner">
            <h1 className="contactheader text-center font-bold text-4xl">Contact Us</h1>
        </section>
        <section className="contact-card mt-10">
            <div class="info-section">
                <p>We'd love to hear from you! Fill out the form and we'll get back shortly.</p>
                <div class="info-block">
                    <h4><b>Email</b></h4>
                    <p>xyz@gmail.com</p>
                </div>
                <div class="info-block">
                    <h4><b>Phone</b></h4>
                    <p>+91 1234567890</p>
                </div>
                <div class="info-block">
                    <h4><b>Address</b></h4>
                    <p>123 abc Street, def district</p>
                </div>
            </div>
            <div class="form-section">
                <form>
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>


        <Footer/>

        </>
    )
}

export default Contact