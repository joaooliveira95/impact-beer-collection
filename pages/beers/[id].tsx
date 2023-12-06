// pages/beers/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Beer } from "@/utils/types";
import { fetchBeerById, fetchBeers } from "@/utils/api";
import Image from "next/image";

interface BeerDetailsProps {
  beer: Beer;
}

const BeerDetails: React.FC<BeerDetailsProps> = ({ beer }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  // If the page is not yet generated, wait for it to be generated and then redirect to the page
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="6xl">
      <Heading as="h1" my={4} textAlign="center">
        {beer.name}
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box flex="1" mr={{ base: 0, md: 8 }}>
          <Text fontSize="xl" fontWeight="bold">
            Tagline: {beer.tagline}
          </Text>
          <Text fontSize="lg">Description: {beer.description}</Text>

          <Divider my={4} />

          <Text fontSize="xl" fontWeight="bold">
            ABV: {beer.abv}%
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            IBU: {beer.ibu}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            First Brewed: {beer.first_brewed}
          </Text>

          <Divider my={4} />

          <Text fontSize="lg">Brewing Method:</Text>
          {beer.method?.mash_temp?.map((step, index) => (
            <Box key={index}>
              <Text>
                Mash Temperature: {step.temp?.value} {step.temp?.unit} for{" "}
                {step.duration} minutes
              </Text>
            </Box>
          ))}

          <Divider my={4} />

          <Text fontSize="lg">Additional Details:</Text>
          <Text>Target FG: {beer.target_fg}</Text>
          <Text>Target OG: {beer.target_og}</Text>
          <Text>EBC: {beer.ebc}</Text>
          <Text>SRM: {beer.srm}</Text>
          <Text>pH: {beer.ph}</Text>
          <Text>Attenuation Level: {beer.attenuation_level}%</Text>
          <Text>
            Volume: {beer.volume?.value} {beer.volume?.unit}
          </Text>
          <Text>
            Boil Volume: {beer.boil_volume?.value} {beer.boil_volume?.unit}
          </Text>

          <Divider my={4} />

          <Button onClick={handleGoBack} mt={4} colorScheme="yellow">
            Go Back
          </Button>
        </Box>

        <Box p={16}>
          {beer?.image_url && (
            <Image
              src={beer.image_url}
              alt={beer.name}
              width={180}
              height={680}
              layout="intrinsic"
            />
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the IDs of all beers to generate dynamic paths
  const beers = await fetchBeers();
  const paths = beers.map((beer: Beer) => ({
    params: { id: beer.id.toString() },
  }));

  return {
    paths,
    fallback: true, // Generate other pages on-demand if they don't exist
  };
};

export const getStaticProps: GetStaticProps<BeerDetailsProps> = async ({
  params,
}) => {
  try {
    const id = params?.id as string;
    const beer = await fetchBeerById(id);

    return {
      props: { beer },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error: any) {
    console.error("Error fetching beer details:", error.message);
    return { props: { beer: {} as Beer } };
  }
};

export default BeerDetails;
