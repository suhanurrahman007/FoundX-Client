import { Button } from "@nextui-org/button";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../../Form/FXForm";
import FXInput from "../../Form/FXInput";
import FXTextarea from "../../Form/FXTextarea";
import { useAddClaimRequest } from "@/src/hooks/cliemRequest";


interface TProps {
  id: string;
  questions: string[];
}

export default function ClaimRequestModal({ id, questions }: TProps) {
  const { mutate: handleClaimRequest, isPending } = useAddClaimRequest();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const claimRequestData = {
      item: id,
      description: data.description,
      answers: Object.keys(data)
        .filter((formElement) => formElement.startsWith("answer"))
        .map((answer) => data[answer]),
    };

    handleClaimRequest(claimRequestData);
  };

  return (
    <FXModal
      buttonClassName="flex-1"
      buttonText="Claim Request"
      title="Claim Request"
    >
      <FXForm onSubmit={onSubmit}>
        {questions.map((question, index) => (
          <div className="mb-4" key={index}>
            <p className="mb-1">{question}</p>
            <FXInput
              label={`Answer - ${index + 1}`}
              name={`answer-${index + 1}`}
            />
          </div>
        ))}

        <FXTextarea label="Description" name="description" />

        <div>
          <Button className="w-full flex-1 my-2" size="lg" type="submit">
            {isPending ? "Sending...." : "Send"}
          </Button>
        </div>
      </FXForm>
    </FXModal>
  );
}
