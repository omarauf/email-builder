import { useShallow } from 'zustand/react/shallow';
import type { TextAlignment } from '@/types';
import { XField } from '@/components/input';
import { colorConverter } from '@/utils/color';
import { XTabs } from '@/components/x-common/tabs';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockIndex } from '../block/type';
import type { TextType, BlockText, HeadingType } from './type';
import { StyleEditor } from './components';

interface Props {
  selectedBlock: BlockText & { idx: BlockIndex };
}

function headingTypeToLevel(type: string) {
  return parseInt(type.replace('h', ''), 10) as 1 | 2 | 3 | 4 | 5 | 6;
}

function levelToHeadingType(level: number) {
  return `h${level}` as HeadingType;
}

export function TextSetting({ selectedBlock }: Props) {
  const [styles, editor, screen, setBlockByKey, getParentStripeType] = useBuilderStore(
    useShallow((s) => [s.styles, s.editor, s.screen, s.setBlockByKey, s.getParentStripeType])
  );

  const { idx, data, style } = selectedBlock;

  // when using the editor command don't pass as reference pass as a function
  // because when editor state get updated the function will get the latest state
  // and if we pass as reference it will get the old state this will cause an transactional error
  // DON'T DO THIS  onChange={editor.commands.setColor}
  // DO THIS        onChange={(c) => editor.commands.setColor(c)}
  if (!editor) return null;

  const stripeType = getParentStripeType(selectedBlock);

  const isHeading = editor.isActive('heading');
  const isParagraph = editor.isActive('paragraph');
  const isTextStyle = editor.isActive('textStyle');
  const isSelected = Math.abs(editor.state.selection.from - editor.state.selection.to) !== 0;

  // let type = "paragraph";
  let backgroundColor = 'transparent';
  let textType: TextType = 'p';
  let lineHeight = 1.5;
  let fontSize = 16;
  let textAlignment: TextAlignment = 'left';

  let { fontFamily } = styles.stripe;
  let { fontColor } = styles.stripe[stripeType];

  if (isHeading) {
    const attrs = editor.getAttributes('heading');
    const { lineHeight: lh, fontSize: fz, textAlign: ta, color: fc, fontFamily: ff } = attrs;
    textType = levelToHeadingType(attrs.level);
    // type = "heading";

    const defaultHeadingFontSize = styles.heading[textType].fontSize[screen];
    const defaultFontColor = styles.heading[textType].fontColor;
    const defaultFontFamily = styles.heading.fontFamily;
    const defaultLineHeight = styles.heading[textType].lineHeight[screen];

    fontColor = fc ? colorConverter.rgb.hex(fc) : defaultFontColor;
    fontFamily = ff || defaultFontFamily;
    fontSize = parseInt(fz || `${defaultHeadingFontSize}px`, 10);
    lineHeight = lh || defaultLineHeight;
    textAlignment = ta || style.textAlignment?.[screen];
  }

  if (isParagraph) {
    const attrs = editor.getAttributes('paragraph');
    const { lineHeight: lh, fontSize: fz, textAlign: ta, color: fc, fontFamily: ff } = attrs;
    textType = 'p';
    // type = "paragraph";

    const defaultStripeFontSize = styles.stripe[stripeType].fontSize[screen];
    const defaultFontColor = styles.stripe[stripeType].fontColor;
    const defaultFontFamily = styles.stripe.fontFamily;
    const defaultLineHeight = styles.stripe.lineHeight[screen];

    fontColor = fc ? colorConverter.rgb.hex(fc) : defaultFontColor;
    fontFamily = ff || defaultFontFamily;
    fontSize = parseInt(fz || `${defaultStripeFontSize}px`, 10);
    lineHeight = lh || defaultLineHeight;
    textAlignment = ta || style.textAlignment?.[screen];
  }

  // TextStyle Should  be the last one, because it will override the other settings
  if (isTextStyle) {
    const attrs = editor.getAttributes('textStyle');
    const { lineHeight: lh, fontSize: fz, color: fc, fontFamily: fF, backgroundColor: bc } = attrs;

    if (fz) fontSize = parseInt(fz, 10);

    if (fc) fontColor = colorConverter.rgb.hex(fc);

    if (fF) fontFamily = fF;

    if (lh) lineHeight = lh;

    if (bc) backgroundColor = bc;
  }

  if (!isSelected) {
    textAlignment = style.textAlignment?.[screen] || 'left';
  }

  const tabs = [
    {
      label: 'Settings',
      content: (
        <>
          <StyleComponent.HeadingType
            value={textType}
            onChange={(vt) => {
              if (vt === 'p') {
                editor.chain().focus().setParagraph().run();
              } else {
                editor
                  .chain()
                  .focus()
                  .setHeading({ level: headingTypeToLevel(vt) })
                  .run();
              }
            }}
          />

          <StyleEditor.TextStyle editor={editor} />

          <Separator />

          <StyleComponent.TextAlignment
            title={`Alignment (${screen})`}
            value={textAlignment}
            onChange={(v) => {
              if (isSelected) editor.chain().focus().setTextAlign(v, screen).run();
              else setBlockByKey(idx, `style.textAlignment.${screen}`, v);
            }}
          />

          <Separator />

          <StyleEditor.TextIndent editor={editor} />

          <Separator />

          <StyleEditor.ExternalLink editor={editor} />

          <Separator />

          <StyleEditor.ListItem editor={editor} />

          {/* <Separator />

          <UnicodePicker editor={editor} />

          <Separator />

          <EmojiPicker editor={editor} /> */}

          <Separator />

          <StyleComponent.LineHeight
            title="Line Height"
            value={lineHeight}
            onChange={(v) => editor.chain().focus().setLineHeight(v).run()}
          />

          <Separator />

          <Separator />

          <StyleComponent.MarginPadding
            badge
            title={`Padding (${screen})`}
            value={style.padding?.[screen]}
            onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
          />

          <Separator />

          <StyleComponent.Hide
            value={data.hide}
            onChange={(v) => setBlockByKey(idx, `data.hide`, v)}
          />
        </>
      ),
    },

    {
      label: 'Styles',
      content: (
        <>
          <StyleComponent.Color
            title={`Background Color (${screen})`}
            value={style.blockBackgroundColor || 'transparent'}
            onChange={(v) => setBlockByKey(idx, 'style.blockBackgroundColor', v)}
          />

          <Separator />

          <StyleComponent.FontFamily
            value={fontFamily}
            onChange={(c) => editor.commands.setFontFamily(c)}
          />

          <Separator />

          <StyleComponent.Block badge title={`Font Size (${screen})`}>
            <XField.Number
              value={fontSize}
              className="w-[120px]"
              onChange={(value) => editor.commands.setFontSize(`${value}px`, lineHeight, screen)}
              steps={1}
            />
          </StyleComponent.Block>

          <Separator />

          <StyleComponent.Color
            title={`Font Color (${screen})`}
            value={fontColor}
            onChange={(e) => editor.commands.setColor(e)}
          />

          <Separator />

          <StyleComponent.Color
            title={`Background Color (${screen})`}
            value={backgroundColor}
            onChange={(c) => editor.commands.setHighlight(c)}
          />
        </>
      ),
    },
  ];

  return <XTabs tabs={tabs} defaultTab="Settings" />;
}
