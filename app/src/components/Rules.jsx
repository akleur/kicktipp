import React, { Component, PropTypes } from 'react';

export default class Rules extends Component {
    render() {
        const { year, competition } = this.props;
        return (
            <div>
                <h1 className="align-center">Kicktipp 2016 - Spielregeln</h1>
                <div className="phone-padding">
                    <p>
                        Der Wetteinsatz beträgt <strong>10 Taler für alle Spieltipps</strong> und <strong>5 Taler
                        für den {competition}-Tipp</strong>. Wir behalten von jedem Mitspieler (egal
                        ob er nur Spieltipps abgibt oder auch noch den {competition} tippt) 1
                        Euro als Unkostenbeitrag ein.
                    </p>
                    <h3>Der Modus</h3>
                    <p>
                        Die zum Sieg notwendigen Punkte werden nach folgendem System verteilt:<br/>
                        <code>
                            <strong>1 Punkt für die richtige Tendenz</strong><br/>
                            Beispiel: Ergebnis 1:0, Euer Tipp 3:0<br/>
                            <strong>2 Punkte für richtige Tordifferenz und richtige Tendenz</strong> (auch bei
                            Unentschieden)<br/>
                            Beispiel: Ergebnis 1:0, Euer Tipp 5:4 <br/>
                            <strong>4 Punkte für den absolut richtigen Tipp</strong><br/>
                            Beispiel: Ergebnis 1:0, Euer Tipp na?!
                        </code>
                    </p>
                    <p>
                        <strong>Elfmeterregelung:</strong><br/>
                        Wird ein Spiel in den Finalrunden durch Elfmeterschiessen entschieden, gibt es zwei offizielle
                        Ergebnisse: das Ergebnis nach der regulären Spielzeit (also nach 90 min) und das Ergebnis der im
                        Elfmeterschießen erzielten Tore. Bisher haben wir das kumuliertes Ergebnis berücksichtigt
                        (Beispiel 3:3 nach 120 Minuten, 5:4 im Elfmeterschießen, also 8:7).
                        <br/>
                        Da es aber zur Verwirrung kam, haben wir entschieden während der Vorrunde eine kurze Umfrage zu
                        organisieren damit ihr entscheidet was ihr besser findet.

                        <br/><br/>
                        <strong>Kicktipp-Joker:</strong><br/>
                        Ab der Finalrunde hat jeder Spieler <strong>einmalig</strong> die Möglichkeit bei einem Spiel
                        den <strong>Kicktipp-Joker</strong> zu setzen. Dieser bewirkt, dass alle bei diesem Spiel
                        erzielten Punkte verdreifacht werden;
                        bei einem absolut richtigen Tipp mit Kicktipp-Joker kann man also locker 12 Punkte einfahren.
                    </p>

                    <h4>Neue Regelung: Tippende für jedes Spiel ist der Anpfiff des Spiels.</h4>
                    <p>
                        Bei den letzten Kicktipp Runden musste immer bis zum Anfang des ersten Spiels der nächsten Runde
                        ALLE Rundenspiele getippt werden: bis zum Anfang des ersten Spiels des Viertelfinales alle
                        Viertelfinale Spielpaarungen, usw. usf. für alle weiteren Finalrunden. <br/>
                        Wir haben diese Regel geändert: ihr dürft jetzt immer bis zum Anpfiff des nächsten Spiels tippen
                        bzw. euren Tipp ändern. So habt ihr mehr Möglichkeiten mittendrin eure Position zu verbessern,
                        z.B. weil die Franzosen doch nicht so gut spielen wie ihr vor dem ersten Spiel gedacht habt ;-).
                    </p>

                    <h4>Tippende für den optionalen {competition}-Tipp ist der Anpfiff des
                        ersten Vorrundenspiels (10.06.{year} 21:00).</h4>
                    <p>
                        Abgegebene Spiel- und {competition}-Tipps können immer wieder bis zum
                        jeweiligen Tippende geändert werden.<br/><br/>
                        Genauso kann der Joker bis zum Anfang des ausgesuchten Spiels immer
                        wieder neu gesetzt oder auch gelöscht werden (um ihn für einem späteren
                        Spiels einsetzen zu können, man hat ja nur einen).<br/><br/>

                        Die Tipps der anderen Mitspieler
                        können ab dem Beginn der jeweiligen Runde angesehen werden. Ab dem Ende
                        des ersten Vorrundespiels gibt es eine Tabelle mit dem Punktestand aller
                        Mitspieler.
                    </p>
                    <h3>Der Gewinn</h3>
                    <p>
                        <strong>Der Gewinner erhält 50%, der Zweite 25%, der Dritte 13%, der Vierte
                            7% und der Fünfte 5% des verbleibenden Wetteinsatzes.</strong><br/><br/>
                        Die Rangliste wird nach folgender <strong>Reihenfolge</strong> sortiert:
                        <strong>Punkte, Anzahl an 4er-Tipps, Anzahl an 2er-Tipps, Anzahl an 1er-Tipps</strong>. Ist
                        diese auch gleich ist der im Vorteil, dessen Endspieltipp
                        näher an der Realität war. Wenn der unwahrscheinliche Fall eines
                        immer noch andauernden Gleichstandes eintritt, gewinnt derjenige, der
                        die meisten Punkte in der Halbfinalrunde gesammelt hat. <br/>
                        <br/>
                        <strong>Beim {competition}tipp teilen sich alle, die richtig getippt haben, die
                            Gesamtbeute.</strong> Die Höhe des Gewinns wird nach Tippende bekanntgegeben.
                        Sollte niemand den richtigen {competition} tippen, wird das Geld sinnvollerweise
                        gemeinsam vertrunken. Termin und Ort werden im Falle eines Falles umgehend
                        bekanntgegeben.<br/>
                    </p>
                    <h3>Wie funktioniert's?</h3>
                    <p>
                        Unter dem Menüpunkt "Registrieren" könnt ihr euch mit einem selbst ausgesuchten Benutzernamen
                        (doch doch) und einer Email Adresse anmelden.<br/> Ihr bekommt dann innerhalb von ein paar
                        Minuten eine Bestätigungsemail mit unseren Bankdaten.<br/> Sobald das Geld angekomen ist
                        (Barbezahlung ist natürlich auch möglich), schicken wir euch eure Zugangsdaten und ihr könnt los
                        gehen!
                    </p>
                    <p>
                        <br/>
                        Viel Spaß beim Tippen!<br/>
                        <strong>Eure Kicktipp {year} - Crew</strong>
                        <br/><br/>Falls ihr bei der Registrierung oder allgemein bei der Seite Schwierigkeiten
                        habt, <br/>schreibt uns einfach eine Email: <strong>kicktipp(at)schwuppdiwupp.net</strong>
                    </p>
                </div>
            </div>
        );
    }
}

Rules.propTypes = {
    year: PropTypes.string.isRequired,
    competition: PropTypes.string.isRequired
};
