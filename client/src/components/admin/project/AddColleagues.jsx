import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import OutlineBtn from "../../btn/OutlineBtn";
import SearchSuggestor from "../../common/SearchSuggestor";
import { useFormContext } from "react-hook-form";
import useProfileStore from "../../../hooks/useProfileStore";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { getProfileAlias } from "../../../api/admin/profile";
import { useEffect } from "react";
import PrimaryBtn from "../../btn/PrimaryBtn";

export default function AddColleagues() {
  const { profile } = useProfileStore();
  const [availableColleagues, setAvailableColleagues] = useState([]);
  const [hasSetColleagues, setHasSetColleagues] = useState(false);
  const { data: profileAlias = [] } = useQuery({
    queryFn: getProfileAlias,
    queryKey: ["profileAlias"],
  });

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedColleagues = watch("colleagues");

  useEffect(() => {
    if (profileAlias?.length) {
      const filteredProfileAlias = profileAlias.filter((alias) => alias.name !== profile.name);

      const hasMappedNameId = !selectedColleagues.some((coll) => typeof coll === "string");
      const isEmpty = availableColleagues.length === 0;

      const allowSet =
        !hasSetColleagues ||
        (JSON.stringify(filteredProfileAlias) !== JSON.stringify(availableColleagues) &&
          !hasMappedNameId) ||
        (!hasMappedNameId && isEmpty);

      if (allowSet) {
        setAvailableColleagues(filteredProfileAlias);

        const filteredColleagues = selectedColleagues.filter((coll) => coll !== profile.name);
        setValue("colleagues", filteredColleagues);
        setHasSetColleagues(true);
      }
    }
  }, [profileAlias, profile.name]);

  const addColleague = (colleague) => {
    const updatedColleagues = [
      ...new Set([...selectedColleagues, profileAlias.find((alias) => alias.name === colleague)]),
    ];

    const filteredAvailableColleagues = availableColleagues.filter(
      (coll) => coll.name !== colleague
    );

    setAvailableColleagues(filteredAvailableColleagues);
    setValue("colleagues", updatedColleagues);
  };

  const deleteColleague = (colleague) => {
    const filteredColleagues = selectedColleagues.filter(
      (coll) => coll._id !== profileAlias.find((alias) => alias.name === colleague.name)._id
    );
    const updatedAvailableColleagues = [...availableColleagues, colleague];
    setAvailableColleagues(updatedAvailableColleagues);
    setValue("colleagues", filteredColleagues);
  };

  const selectAll = () => {
    setValue(
      "colleagues",
      profileAlias.filter((alias) => alias.name !== profile.name)
    );
    setAvailableColleagues([]);
  };

  const colleaguesErrorMessage = errors?.colleagues?.message;

  const hasMappedNameId = !selectedColleagues.some((coll) => typeof coll === "string");
  const availableUserNames = availableColleagues.map((coll) => coll.name);

  return (
    <div className="flex flex-col gap-y-2 w-full my-10">
      <div className="flex flex-col md:flex-row! justify-between gap-y-4 gap-x-8">
        <p className="text-lg text-slate-600 font-medium">
          Lägg till kollegor som har bidragit till projektet
        </p>
        <div className="w-fit">
          <PrimaryBtn onClick={selectAll}>Välj alla</PrimaryBtn>
        </div>
      </div>
      <div
        className={`flex justify-between gap-x-12 mb-4 ${
          colleaguesErrorMessage ? "opacity-100" : "opacity-0"
        }`}>
        <p className="text text-red-500! font-bold">{colleaguesErrorMessage}</p>
        <HiOutlineExclamationCircle size={24} color="red" />
      </div>
      <div
        className={`flex flex-col w-full p-4 border-2 rounded-md ${
          colleaguesErrorMessage ? "border-red-500!" : "border-transparent"
        }`}>
        <SearchSuggestor
          data={availableUserNames}
          select={addColleague}
          disabledPlaceholder="Inga kollegor är för närvarande tillgängliga"
          enabledPlaceHolder="Sök efter kollegor med deras användarnamn"
        />
        {hasMappedNameId && (
          <ul className="flex flex-wrap gap-2 p-4">
            {selectedColleagues?.map((colleague) => {
              return (
                <OutlineBtn key={colleague._id} onClick={() => deleteColleague(colleague)}>
                  <span>{colleague.name}</span>
                  <IoMdClose size={24} color="grey" />
                </OutlineBtn>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
