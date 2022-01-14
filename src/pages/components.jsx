import { Container } from "@/components/UI/atoms/container";
import { InputWithTrailingButton } from "@/components/UI/atoms/input/with-trailing-button";
import { RecentVotesTable } from "@/components/UI/organisms/reporting/RecentVotesTable";
import { ReportSummary } from "@/src/_mocks/reporting/ReportSummary";
import Head from "next/head";
import { TotalLiquidityChart } from "@/components/UI/molecules/TotalLiquidityChart";

export default function Components() {
  return (
    <main>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Container className="px-8 py-6">
        <div className="max-w-md">
          <InputWithTrailingButton
            buttonProps={{
              children: "Max",
              onClick: () => {},
            }}
            unit="NPM-USDC-LP"
            inputProps={{
              id: "test-input-id",
              placeholder: "Enter Amount",
            }}
          />
        </div>

        <br />

        <ReportSummary />

        <br />

        <RecentVotesTable />

        <br />
        <br />

        <div style={{ width: "800px", height: "500px" }}>
          <TotalLiquidityChart />
        </div>
      </Container>
    </main>
  );
}
