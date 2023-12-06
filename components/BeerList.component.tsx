import { truncateText } from "@/utils/functions";
import { Beer } from "@/utils/types";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const BEER_BOTTLE_IMG_H = 996;
const BEER_BOTTLE_IMG_W = 256;
const KEG_IMG_W = 125;

interface BeerListProps {
  beers: Beer[];
}

const BeerList: React.FC<BeerListProps> = ({ beers }) => (
  <SimpleGrid key={beers.length} columns={[1, 1, 2, 2, 3, 3]} gap={{ base: 4, md: 8 }}>
    {beers?.map((beer) => (
      <Link key={beer.id} href={`/beers/${beer.id}`} passHref>
        <Box
          key={beer.id}
          width={{ base: "100%" }}
          height={"100%"}
          p={4}
          bg="whiteAlpha.900"
          borderRadius={"md"}
          borderWidth={"1px"}
        >
          <Flex h={BEER_BOTTLE_IMG_H / 4} justifyContent={"center"} my={2}>
            {beer?.image_url && (
              <Image
                src={beer.image_url}
                alt={beer.name}
                width={
                  beer?.image_url?.includes("keg.png")
                    ? KEG_IMG_W
                    : BEER_BOTTLE_IMG_W / 4
                }
                height={BEER_BOTTLE_IMG_H / 4}
              />
            )}
          </Flex>
          <VStack py={2} textAlign={"center"}>
            <Tooltip
              label={`Know more about ${beer.name}`}
              aria-label={`Know more about ${beer.name}`}
            >
              <Heading
                as="h3"
                size="md"
                mb={1}
                _hover={{ color: "yellow.500" }}
                cursor={"pointer"}
                transition="color 0.3s ease"
              >
                {truncateText(beer.name, 20)}
              </Heading>
            </Tooltip>
            <Text>{beer.tagline}</Text>
            <Text>
              ABV: {beer.abv} % | PH: {beer.ph} %
            </Text>
            <Text>First Brewed: {beer.first_brewed}</Text>
          </VStack>
        </Box>
      </Link>
    ))}
  </SimpleGrid>
);

export default BeerList;
