import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Props = {
  label: string;
  value: string | number | undefined;
  separator?: boolean;
};

const CardContentInfo = (props: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <Label className="font-thin">{props.label}</Label>
        <Separator orientation="vertical" />
        <Label>{props.value}</Label>
      </div>
      {props.separator && <Separator />}
    </>
  );
};

export default CardContentInfo;
