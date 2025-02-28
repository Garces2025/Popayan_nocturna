import React, { Fragment } from "react";
import Slide from "../../partials/slide";
import ItemsCard from "../events/ItemsCard";
import EventBg from "../events/EventBg";
import Spinner from "../../partials/Spinner";
import { useSelector } from "react-redux";

const Home = () => {
    const brands = useSelector(store => store.brands);
    const data = useSelector(store => store.events);

    // Aseguramos que brands es un arreglo
    const brandsArray = Array.isArray(brands) ? brands : [];

    return(
        <div className="home">
            <Slide />
            {(brands == null || data == null)
                ? <Spinner />
                : brandsArray.map( brand =>
                    <Fragment key={brand.id}>
                        <EventBg bg={`bg/${brand.title}.jpg`} />
                        <ItemsCard events={data} brand={brand.title} state='home' />
                    </Fragment>
                )
            }
        </div>
    );
}

export default Home;
