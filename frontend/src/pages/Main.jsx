import React from "react";
import "../css/Main.css";

const Main = () => {
    return (
        <div className="image-container">
            <div className="Main-container">
                <header className="Main-title">Przychodnia Medicare</header>
                <div className="Main-description-box">
                    <p className="Main-description">
                        <span className="Main-highlight">Przychodnia Medicare</span> to miejsce, gdzie troszczymy się o zdrowie i dobro naszych pacjentów.
                        Oferujemy kompleksową opiekę medyczną oraz nowoczesne podejście do leczenia.
                        Nasz zespół doświadczonych lekarzy i specjalistów dba o każdego pacjenta indywidualnie,
                        zapewniając wysoką jakość usług medycznych.
                    </p>
                </div>
                <div className="services-container">
                    <div className="service-box">
                        <h2 className="service-title"> Usługi Lekarskie:</h2>
                        <ul className="service-list">
                            <li>Kardiologia</li>
                            <li>Laryngologia</li>
                            <li>Ortopedia</li>
                            <li>Dermatologia</li>
                            <li>Okulista</li>
                            <li>Ginekologia</li>
                        </ul>
                    </div>
                    <div className="service-box">
                        <h2 className="service-title">Usługi Lekarskie:</h2>
                        <ul className="service-list">
                            <li>Internista</li>
                            <li>Chirurgia</li>
                            <li>Endokrynologia</li>
                            <li>Neurologia</li>
                            <li>Pulmonologia</li>
                            <li>Psychiatra</li>
                        </ul>
                    </div>
                </div>
                <footer>&#169; Przychodnia Medicare</footer>
            </div>
        </div>
    );
};

export default Main;
