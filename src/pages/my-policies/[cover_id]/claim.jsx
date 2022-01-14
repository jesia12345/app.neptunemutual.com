import Head from "next/head";
import { BreadCrumbs } from "@/components/UI/atoms/breadcrumbs";
import { Container } from "@/components/UI/atoms/container";
import { Hero } from "@/components/UI/molecules/Hero";
import { HeroTitle } from "@/components/UI/molecules/HeroTitle";
import { HeroStat } from "@/components/UI/molecules/HeroStat";
import { MyPoliciesClaimTable } from "@/components/UI/organisms/my-policies/MyPoliciesClaimTable";

export default function MyPoliciesTxs() {
  return (
    <main>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Hero>
        <Container className="px-2 py-20">
          <BreadCrumbs
            pages={[
              {
                name: "My Policies",
                href: "/my-policies/active",
                current: false,
              },
              { name: "Clearpool", href: "#", current: false },
              { name: "Claim", href: "#", current: true },
            ]}
          />

          <div className="flex items-start">
            <HeroTitle>My Policies</HeroTitle>

            {/* My Active Protection */}
            <HeroStat title="My Active Protection">
              <>$ 150,000.00</>
            </HeroStat>
          </div>
        </Container>

        <hr className="border-b border-B0C4DB" />

        <Container className="px-2 pt-12 pb-96">
          <HeroTitle>Available cxTokens for Clearpool to Claim</HeroTitle>
          <p className="text-lg w-full pt-6 pb-16 lg:w-1/2 ml-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <MyPoliciesClaimTable />
        </Container>
      </Hero>
    </main>
  );
}
