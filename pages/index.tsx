import React, { FC } from "react";
import { useFetchPokemonWithInfinityScroll } from "../hooks/usePokemon";
import useFetchNextPage from "../hooks/useFetchNextPage";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("../components/pages/HomePage"), {
  ssr: true,
});

const Container = dynamic(() => import("../components/UI/atoms/Container"), {
  ssr: true,
});

const MyBeatLoader = dynamic(
  () => import("../components/UI/molecules/BeatLoader"),
  {
    ssr: true,
  }
);

const IndexPage: FC = (): JSX.Element => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isInitialLoading } =
    useFetchPokemonWithInfinityScroll();

  useFetchNextPage(hasNextPage, fetchNextPage);

  if (isInitialLoading) {
    return (
      <Container page="spinner">
        <MyBeatLoader loading={isInitialLoading} />
      </Container>
    );
  }

  if (isSuccess) {
    return <HomePage pokemonList={data} />;
  }

  return <></>;
};

export default IndexPage;
