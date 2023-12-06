import { useState } from "react";
import {
  Container,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useBeerContext } from "@/context/beer.context";
import { useRouter } from "next/router";

const SubmitBeerPage: React.FC = () => {
  const router = useRouter();

  const { addBeer } = useBeerContext();
  const [beerData, setBeerData] = useState({
    name: "",
    tagline: "",
    description: "",
    abv: "",
    ibu: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBeerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle the submission logic (e.g., send data to an API)
    console.log("Submitted beer data:", beerData);
    addBeer(beerData as any);
    router.push("/");
  };

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <Container maxW="xl">
      <Heading as="h1" my={4} textAlign="center">
        Submit a New Beer
      </Heading>
      <Box p={8}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={beerData.name}
              onChange={handleChange}
              placeholder="Enter beer name"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Tagline</FormLabel>
            <Input
              type="text"
              name="tagline"
              value={beerData.tagline}
              onChange={handleChange}
              placeholder="Enter beer tagline"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={beerData.description}
              onChange={handleChange}
              placeholder="Enter beer description"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>ABV</FormLabel>
            <Input
              type="number"
              name="abv"
              min={0}
              value={beerData.abv}
              onChange={handleChange}
              placeholder="Enter ABV"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>IBU</FormLabel>
            <Input
              type="number"
              name="ibu"
              min={0}
              value={beerData.ibu}
              onChange={handleChange}
              placeholder="Enter IBU"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Submit Beer
          </Button>
          <Button ml={2} onClick={handleGoBack}>
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SubmitBeerPage;
