import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Block, blockStyle } from '@/components/styles/block';

export function EmailAnnotations() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  const onChangeHandler = (v: boolean) => {
    if (v === false)
      setMetaByKey('emailAnnotations', {
        enable: false,
        endOfOffer: undefined,
        offerBadge: undefined,
        promoCode: undefined,
        promoImage: undefined,
        senderLogo: undefined,
      });
    else
      setMetaByKey('emailAnnotations', {
        enable: true,
        endOfOffer: undefined,
        offerBadge: undefined,
        promoCode: undefined,
        promoImage: undefined,
        senderLogo: undefined,
      });
  };

  return (
    <>
      <Block
        title="Email annotations for Gmail"
        control={
          <Switch checked={meta.emailAnnotations.enable} onCheckedChange={onChangeHandler} />
        }>
        <p className="text-sm">
          This feature lets you showcase your deals, discounts, or offers directly in
          recipients&apos; inboxes before they open the email. Effective on mobile devices in
          Gmail’s “Promotions” folder.
        </p>
      </Block>

      {meta.emailAnnotations.enable && (
        <div className={cn('flex flex-col gap-4', blockStyle.px, blockStyle.py)}>
          <GmailSearch />

          <p className="ml-2 uppercase">Promotions</p>

          <GmailProfile />
        </div>
      )}
    </>
  );
}

function GmailProfile() {
  const meta = useBuilderStore((s) => s.meta);

  return (
    <div className="flex gap-4">
      {meta.emailAnnotations.senderLogo ? (
        <img
          alt="Sender Logo"
          src={meta.emailAnnotations.senderLogo}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <Skeleton className="bg-muted-foreground h-[40px] w-[40px] rounded-full" />
      )}

      <div className="flex flex-col text-sm">
        <p>Search in mail</p>
        <p>{meta.subject || 'Enter subject in the field above'}</p>
        <p>{meta.preheader || 'Enter hidden preheader in the field above'}</p>
        <div className="flex items-center gap-2">
          {meta.emailAnnotations.offerBadge && (
            <p className="px-2 text-green-500">{meta.emailAnnotations.offerBadge}</p>
          )}

          {meta.emailAnnotations.promoCode && (
            <div className="flex items-center gap-2">
              <p>Code</p>
              <p className="px-2">{meta.emailAnnotations.promoCode}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GmailSearch() {
  return (
    <div className="bg-muted-foreground text-background flex items-center gap-2 rounded-lg px-4 py-2 shadow-sm">
      <Iconify icon="material-symbols:menu" />

      <p className="ml-2">Search in mail</p>

      <div className="grow" />

      <Skeleton className="h-6 w-6" />
    </div>
  );
}
