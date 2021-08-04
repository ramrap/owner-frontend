import StoreOverview from "@components/Store/StoreOverview";
import StoreServices from "@components/Store/StoreServices";
import StoreReviews from "@components/Store/StoreReviews";

export const STORE_DETAIL_TAB = [
    {
        key: "overview",
        title: "Overview",
        component: (store) => <StoreOverview store={store} />,
    },
    {
        key: "services",
        title: "Services",
        component: (store) => <StoreServices store={store} />,
    },
    {
        key: "reviews",
        title: "Reviews",
        component: (store) => <StoreReviews store={store} />,
    },
];
