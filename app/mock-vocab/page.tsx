import { COLORS } from '../../lib/colors'
import { WordCardFront } from '../../components'

export default function SpellingPage() {
    return (
        <WordCardFront
            color={COLORS.yellow.bg}
            colorDark={COLORS.yellow.bgDark}
            colorHover={COLORS.yellow.bgHover}
            colorFocus={COLORS.yellow.bgFocus}
            headerText="UIL Spelling Practice"
            score_correct={12}
            score_total={15}
        />
    )
}