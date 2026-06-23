import { FieldLabel, TextInput } from '../ui/FormFields';

interface AddPlaceSocialLinksProps {
  website: string;
  douyinAccount: string;
  onWebsiteChange: (value: string) => void;
  onDouyinChange: (value: string) => void;
}

/** Optional website & Douyin account when adding a place */
export function AddPlaceSocialLinks({
  website,
  douyinAccount,
  onWebsiteChange,
  onDouyinChange,
}: AddPlaceSocialLinksProps) {
  return (
    <section className="rounded-2xl border border-neutral-100 bg-white px-4 py-4">
      <h2 className="text-[15px] font-bold text-neutral-900">Website & Douyin account</h2>
      <p className="mt-1 text-[13px] text-neutral-500">
        Optional — link the official site or Douyin profile for this place
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <FieldLabel label="Website" />
          <TextInput
            type="url"
            inputMode="url"
            placeholder="https://www.example.com"
            value={website}
            onChange={(e) => onWebsiteChange(e.target.value)}
            className="border-0 bg-neutral-100 focus:ring-tiktok/20"
          />
        </div>
        <div>
          <FieldLabel label="Douyin account" />
          <TextInput
            placeholder="@username or profile link"
            value={douyinAccount}
            onChange={(e) => onDouyinChange(e.target.value)}
            className="border-0 bg-neutral-100 focus:ring-tiktok/20"
          />
        </div>
      </div>
    </section>
  );
}
