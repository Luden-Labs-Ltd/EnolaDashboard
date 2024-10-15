import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { getFamilies } from "entities/families";
import { AddFamily } from "features/add-family";
import { ArchiveFamily } from "features/archive-family";
import SearchPanel from "features/search-panel";
import Families from "page/families";
import ArchiveIcon from "shared/assets/ArchiveIcon";

export default async function FamiliesPage() {
  const families = await getFamilies();

  return (
    <main>
      <SearchPanel
        actions={
          <Row>
            <ArchiveFamily>
              <Button withIcon variant={"ghost"}>
                <ArchiveIcon />
                <span>Archive</span>
              </Button>
            </ArchiveFamily>
            <AddFamily />
          </Row>
        }
      />
      <Families families={families} />
    </main>
  );
}
