import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import OutlineBtn from "../btn/OutlineBtn";
import SearchSuggestor from "../common/SearchSuggestor";
import { useFormContext } from "react-hook-form";
import useProfileStore from "../../hooks/useProfileStore";

const COLLEAGUES = ["Oscar Burman", "Frank", "Sebbe", "Andy", "Tobbe", "Robin", "Elias", "Neriman"];

export default function AddColleagues() {
  const { profile } = useProfileStore();
  const [availableColleagues, setAvailableColleagues] = useState(
    COLLEAGUES.filter((coll) => coll !== profile.name)
  );
  const { setValue, watch } = useFormContext();

  const selectedColleagues = watch("colleagues");

  const setColleagues = (updatedColleagues) => {
    setValue("colleagues", updatedColleagues);
  };

  const addColleague = (colleague) => {
    const updatedColleague = [...new Set([...selectedColleagues, colleague])];
    setColleagues(updatedColleague);
  };

  const deleteColleague = (colleague) => {
    const filteredColleagues = selectedColleagues.filter((coll) => coll !== colleague);
    setColleagues(filteredColleagues);
  };

  return (
    <div className="flex flex-col">
      <SearchSuggestor
        data={availableColleagues}
        select={addColleague}
        disabledPlaceholder="Inga kollegor är för närvarande tillgängliga"
        enabledPlaceHolder="Sök efter kollegor med deras användarnamn"
      />
      <ul className="flex flex-wrap gap-2 p-4">
        {selectedColleagues?.map((colleague) => {
          return (
            <OutlineBtn key={colleague} onClick={() => deleteColleague(colleague)}>
              <span>{colleague}</span>
              <IoMdClose size={24} color="grey" />
            </OutlineBtn>
          );
        })}
      </ul>
      <p className="text-gray-400">Lägg till kollegor som har bidragit till projektet</p>
    </div>
  );
}
