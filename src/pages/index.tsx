"use client";
import { withUrqlClient } from "next-urql";
import Navbar from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Bloglist from "../components/Bloglist";
import { Box, Spinner } from "@chakra-ui/react";

const Home = () => {
  const [{ fetching, data }] = usePostsQuery();

  return (
    <Box>
      <Navbar />
      {data?.posts?.length && !fetching
        ? data.posts.map((item) => <Bloglist key={item.id} item={item} />)
        : null}

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"80vh"}
      >
        {fetching ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
