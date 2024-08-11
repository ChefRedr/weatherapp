export default function Astro({ img, info1, info2 }) {
    return(
        <section className="astroInfo">
            <img src={img} alt="astro body" />
            <div>
                <p>{info1}</p>
                <p>{info2}</p>
            </div>
        </section>
    );
}