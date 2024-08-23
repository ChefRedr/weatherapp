export default function Astro({ img, info1, info2 }) {
    return(
        <section className="astroInfo">
            <figure>
                <img src={img} alt="astro body" />
            </figure>
            <figcaption>
                <p>{info1}</p>
                <p>{info2}</p>
            </figcaption>
        </section>
    );
}