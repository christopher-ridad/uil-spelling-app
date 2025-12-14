import { COLORS } from '../lib/colors'
import { FeatureButtonGrid, CardHeader, AudioButton, SubmitAnswerButton } from '../components'


export default function Home() {
    return (
        <main>
            <CardHeader headerColor={COLORS.blue.bg} scoreDisplayColor={COLORS.blue.bgDark} headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor={COLORS.red.bg} scoreDisplayColor={COLORS.red.bgDark} headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor={COLORS.green.bg} scoreDisplayColor={COLORS.green.bgDark} headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor={COLORS.yellow.bg} scoreDisplayColor={COLORS.yellow.bgDark} headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor={COLORS.pink.bg}scoreDisplayColor={COLORS.pink.bgDark} headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor={COLORS.orange.bg} scoreDisplayColor={COLORS.orange.bgDark} headerText="UIL Spelling Practice" correct={12} total={15} />
            <FeatureButtonGrid />
            <AudioButton color={COLORS.blue.bg}/>
            <AudioButton color={COLORS.red.bg}/>
            <AudioButton color={COLORS.green.bg}/>
            <AudioButton color={COLORS.yellow.bg}/>
            <AudioButton color={COLORS.pink.bg}/>
            <AudioButton color={COLORS.orange.bg}/>
            <SubmitAnswerButton color={COLORS.blue.bg} buttonText="Submit Answer"/>
        </main>
    )
}