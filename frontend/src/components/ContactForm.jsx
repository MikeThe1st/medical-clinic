import React from "react";
import "../css/Contact.css";



const ContactForm = () => {
    return (
        <div>
          
            <div className='contact-container'>
                <h1 className='clinic-title-contact'>Przychodnia Medicare</h1>
                <div className='clinic-description-contact'>
                    <div className="frame-contact">
                        <h2 className='contact-clinic-description-title'>Kontakt Naszej Przychodni:</h2>
                        <ul>
                            <li>Łódź ul.Rewolucji 1905.r/45</li>
                            <li>Tel: 645-642-664</li>
                            <li>Kontakt mailowy: medicare@medicare.com</li>
                        </ul>
                        <div className="images-container">
                            <img src="https://previews.123rf.com/images/rufous/rufous2305/rufous230500830/203769906-nowoczesna-przychodnia-lekarska-renderowanie-3d-generatywne-ai.jpg" alt="Obraz 1" className="clinic-image small-image" />
                            <img src="https://media.istockphoto.com/id/822457324/pl/zdj%C4%99cie/kobieta-lekarz-wyja%C5%9Bniaj%C4%85c-diagnoz%C4%99-jej-pacjenta.jpg?s=2048x2048&w=is&k=20&c=wbblToTzlLwe2Fy6_aydaIzhmDarcPvlS3Am8AwELA8=" alt="Obraz 2" className="clinic-image medium-image" />
                            <img src="https://media.istockphoto.com/id/1173046912/pl/zdj%C4%99cie/lekarze-i-pacjenci-konsultuj%C4%85cy-si%C4%99-i-diagnostyczni-badaj%C4%85cy-siedzie%C4%87-i-rozmawia%C4%87-przy.jpg?s=1024x1024&w=is&k=20&c=Gy2AZW7CcPyLiVJyVQh1lvWL25Myr1SvVJB6j0q9nm8=" alt="Obraz 3" className="clinic-image large-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
