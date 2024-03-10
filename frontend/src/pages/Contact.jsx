import React from "react";
import "../css/Contact.css"; 

const Contact = () => {
    return (
        <div className='main-container'>
            <h1 className='clinic-title'>Przychodnia Medicare</h1>
            <div className='clinic-description'>
                <div className="frame">
                    <h2 className='clinic-description-title'>O Naszej Przychodni:</h2>
                    <ul>
                        <li>Przychodnia Medicare to miejsce, w którym dbamy o Twoje zdrowie i dobrostan. Naszym celem jest zapewnienie kompleksowej opieki medycznej na najwyższym poziomie.</li>
                        <li>Nasz zespół składa się z doświadczonych lekarzy specjalistów, którzy są gotowi pomóc Ci w rozwiązaniu wszelkich problemów zdrowotnych.</li>
                        <li>Niezależnie od tego, czy potrzebujesz konsultacji lekarskiej, badań diagnostycznych czy leczenia, możesz liczyć na naszą profesjonalną obsługę i wsparcie.</li>
                    </ul>
                    <div className="images-container">
                        <img className="clinic-image" src="https://media.istockphoto.com/id/1388254153/pl/zdj%C4%99cie/uj%C4%99cie-dziecka-siedz%C4%85cego-na-kolanach-matki-podczas-badania-przez-lekarza.jpg?s=1024x1024&w=is&k=20&c=_QZdfWPaUtC2rMu61x93jDXEk0XbGfkSviEWRiTZUUw=" alt="Obrazek 1" />
                        <img className="clinic-image" src="https://media.istockphoto.com/id/500675660/pl/zdj%C4%99cie/nowoczesne-wn%C4%99trze-gabinetu-dentystycznego.jpg?s=1024x1024&w=is&k=20&c=F8BT_hSMNYqa1gy7Czf1BYukpgDgqMSCfWpfQsjjXOY=" alt="Obrazek 2" />
                        <img className="clinic-image" src="https://media.istockphoto.com/id/1319031310/pl/zdj%C4%99cie/lekarz-pisz%C4%85cy-recept%C4%99-lekarsk%C4%85.jpg?s=2048x2048&w=is&k=20&c=zGvK2zLeSS0b1FOUxC5AZ65s8ESFaCjeZZ74o1eA7qg=" alt="Obrazek 3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
