import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import OutlineBtn from "../../btn/OutlineBtn";
import SearchSuggestor from "../../common/SearchSuggestor";
import { useFormContext } from "react-hook-form";
import useProfileStore from "../../../hooks/useProfileStore";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { getProfileAlis } from "../../../api/admin/profile";
import { useEffect } from "react";

export default function AddColleagues() {
  const { profile } = useProfileStore();
  const { data: profileAlias = [] } = useQuery({
    queryFn: getProfileAlis,
    queryKey: ["profileAlias"],
  });

  const [availableColleagues, setAvailableColleagues] = useState([]);

  useEffect(() => {
    if (profileAlias?.length) {
      const filteredProfileAlias = profileAlias.filter((alias) => alias.name !== profile.name);

      if (JSON.stringify(filteredProfileAlias) !== JSON.stringify(availableColleagues)) {
        setAvailableColleagues(filteredProfileAlias);
      }
    }
  }, [profileAlias, profile.name]);

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedColleagues = watch("colleagues");

  const setColleagues = (updatedColleagues) => {
    const nameAsIds = updatedColleagues.map((coll) =>
      profileAlias.find((alias) => alias.name === coll)
    );
    setValue("colleagues", nameAsIds);
  };

  const addColleague = (colleague) => {
    const updatedColleagues = [...new Set([...selectedColleagues, colleague])];
    const filteredAvailableColleagues = availableColleagues.filter(
      (coll) => coll.name !== colleague
    );
    setAvailableColleagues(filteredAvailableColleagues);
    setColleagues(updatedColleagues);
  };

  const deleteColleague = (colleague) => {
    const filteredColleagues = selectedColleagues.filter((coll) => coll !== colleague);
    const updatedAvailableColleagues = [...availableColleagues, colleague];
    setAvailableColleagues(updatedAvailableColleagues);
    setColleagues(filteredColleagues);
  };

  const colleaguesErrorMessage = errors?.colleagues?.message;

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <p className="text-lg text-slate-600 font-medium">
        Lägg till kollegor som har bidragit till projektet
      </p>
      <div
        className={`flex justify-between gap-x-12 mb-4 ${
          colleaguesErrorMessage ? "opacity-100" : "opacity-0"
        }`}>
        <p className="text text-red-500 font-bold">{colleaguesErrorMessage}</p>
        <HiOutlineExclamationCircle size={24} color="red" />
      </div>
      <div
        className={`flex flex-col w-full p-4 border-2 rounded-md ${
          colleaguesErrorMessage ? "border-red-500" : "border-transparent"
        }`}>
        <SearchSuggestor
          data={availableColleagues.map((coll) => coll.name)}
          select={addColleague}
          disabledPlaceholder="Inga kollegor är för närvarande tillgängliga"
          enabledPlaceHolder="Sök efter kollegor med deras användarnamn"
        />
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
      </div>
    </div>
  );
}
