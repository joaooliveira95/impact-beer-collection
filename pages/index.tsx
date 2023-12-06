import { Beer } from "@/utils/types";
import {
  Heading,
  Select,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  VStack,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import { fetchBeers, fetchFilteredBeers } from "@/utils/api";
import { GetStaticProps } from "next";
import BeerList from "@/components/BeerList.component";
import { useEffect, useState } from "react";
import { orderBy } from "lodash";
import Link from "next/link";
import { useBeerContext } from "@/context/beer.context";

interface HomePageProps {
  beers: Beer[];
}

export default function HomePage({ beers: initialBeers }: HomePageProps) {
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { beers, addBeers, updateBeers } = useBeerContext();
  const [filters, setFilters] = useState({
    abv_gt: "",
    abv_lt: "",
    ibu_gt: "",
    ibu_lt: "",
    ebc_gt: "",
    ebc_lt: "",
    beer_name: "",
    yeast: "",
    brewed_before: "",
    brewed_after: "",
    hops: "",
    malt: "",
    food: "",
    ids: "",
  });

  useEffect(() => {
    if (!beers.length) updateBeers(initialBeers);
  }, [beers.length, initialBeers]);

  const sortBeersBy = (sortBy: string | undefined, beers: Beer[]) => {
    if (!sortBy) return beers;

    const sortSplitted = sortBy.split("-");
    return orderBy(
      beers,
      [sortSplitted[0]],
      [sortSplitted[1] === "desc" ? "desc" : "asc"]
    );
  };

  const loadMoreBeers = async () => {
    try {
      setIsLoadingMore(true);

      const nextPage = page + 1;
      const additionalBeers: Beer[] = await fetchBeers(nextPage);

      if (!additionalBeers?.length) setIsLoadMoreDisabled(true);

      addBeers(additionalBeers);
      setPage(nextPage);
    } catch (error: any) {
      console.error("Error fetching more beers:", error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilterButtonClick = async () => {
    try {
      const filteredBeers: Beer[] = await fetchFilteredBeers(filters);

      updateBeers(filteredBeers);
      setIsLoadMoreDisabled(true);
      setPage(1);
    } catch (error: any) {
      console.error("Error fetching filtered beers:", error.message);
    }
  };

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      templateRows={{ base: "auto auto", lg: "100vh" }}
      gap={{ base: 4, md: 8 }}
    >
      <GridItem
        colSpan={{ base: 12, lg: 4, xl: 3 }}
        gridRow={1}
        py={{ base: 4, md: 8 }}
        pr={4}
        pl={{ base: 4, md: 12 }}
      >
        <Heading as="h1" mb={2}>
          Beer Collection
        </Heading>
        <Text mb={4}>
          Welcome to your beer collection app using Chakra UI and Next.js with
          TypeScript!
        </Text>
        <VStack gap={2}>
          <FormControl>
            <FormLabel>Search by beer name</FormLabel>
            <Input
              placeholder="Search by beer name"
              value={filters.beer_name}
              onChange={(e) => handleFilterChange("beer_name", e.target.value)}
            />
          </FormControl>
          <SimpleGrid columns={2} gap={2}>
            <FormControl>
              <FormLabel>ABV greater than</FormLabel>
              <Input
                placeholder="ABV greater than"
                value={filters.abv_gt}
                onChange={(e) => handleFilterChange("abv_gt", e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ABV less than</FormLabel>
              <Input
                placeholder="ABV less than"
                value={filters.abv_lt}
                onChange={(e) => handleFilterChange("abv_lt", e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={2} gap={2}>
            <FormControl>
              <FormLabel>IBU greater than</FormLabel>
              <Input
                placeholder="IBU greater than"
                value={filters.ibu_gt}
                onChange={(e) => handleFilterChange("ibu_gt", e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>IBU greater than</FormLabel>
              <Input
                placeholder="IBU less than"
                value={filters.ibu_lt}
                onChange={(e) => handleFilterChange("ibu_lt", e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={2} gap={2}>
            <FormControl>
              <FormLabel>EBC greater than</FormLabel>
              <Input
                placeholder="EBC greater than"
                value={filters.ebc_gt}
                onChange={(e) => handleFilterChange("ebc_gt", e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>EBC less than</FormLabel>
              <Input
                placeholder="EBC less than"
                value={filters.ebc_lt}
                onChange={(e) => handleFilterChange("ebc_lt", e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel>Yeast</FormLabel>
            <Input
              placeholder="Yeast"
              value={filters.yeast}
              onChange={(e) => handleFilterChange("yeast", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brewed before (mm-yyyy)</FormLabel>
            <Input
              placeholder="Brewed before (mm-yyyy)"
              value={filters.brewed_before}
              onChange={(e) =>
                handleFilterChange("brewed_before", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brewed after (mm-yyyy)</FormLabel>
            <Input
              placeholder="Brewed after (mm-yyyy)"
              value={filters.brewed_after}
              onChange={(e) =>
                handleFilterChange("brewed_after", e.target.value)
              }
            />
          </FormControl>
          <Button onClick={handleFilterButtonClick} mb={4}>
            Apply Filters
          </Button>
          <Select
            placeholder="Sort by"
            value={sortBy}
            onChange={(e: any) => setSortBy(e?.target?.value)}
          >
            <option value="id-asc">ID ASC</option>
            <option value="id-desc">ID DESC</option>
            <option value="name-asc">Name ASC</option>
            <option value="name-desc">Name DESC</option>
            <option value="abv-asc">ABV ASC</option>
            <option value="abv-desc">ABV DESC</option>
            <option value="ph-asc">PH ASC</option>
            <option value="ph-desc">PH DESC</option>
            <option value="first_brewed-asc">First Brewed ASC</option>
            <option value="first_brewed-desc">First Brewed DESC</option>
          </Select>
          <Link href="/submit-beer">
            <Button>Submit a Beer</Button>
          </Link>
        </VStack>
      </GridItem>

      <GridItem
        colSpan={{ base: 12, lg: 8, xl: 9 }}
        gridRow={{ base: 2, lg: 1 }}
        overflowY={"auto"}
        py={8}
        pl={{ base: 4, lg: 4 }}
        pr={{ base: 4, lg: 16 }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems={"center"}
        >
          <BeerList beers={sortBeersBy(sortBy, beers)} />
          <Button
            onClick={loadMoreBeers}
            mt={4}
            size={"lg"}
            px={12}
            isDisabled={isLoadMoreDisabled}
            isLoading={isLoadingMore}
          >
            Load More
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const beers: Beer[] = await fetchBeers(1);

    return {
      props: { beers },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error: any) {
    console.error("Error fetching beers:", error.message);
    return { props: { beers: [] } };
  }
};
