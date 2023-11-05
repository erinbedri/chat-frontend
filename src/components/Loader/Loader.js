import React from "react";
import { BounceLoader } from "react-spinners";

export default function Loader({ isLoading }) {
    return (
        <BounceLoader color={"#3cc3bd"} loading={isLoading} size={50} aria-label="Loading..." data-testid="loader" />
    );
}
