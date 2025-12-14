import { CardHeader } from '../components'

export default function Home() {
    return (
        <main>
            <CardHeader headerColor="blue" scoreDisplayColor="blue" headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor="red" scoreDisplayColor="red" headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor="green" scoreDisplayColor="green" headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor="yellow" scoreDisplayColor="yellow" headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor="pink" scoreDisplayColor="pink" headerText="UIL Spelling Practice" correct={12} total={15} />
            <CardHeader headerColor="orange" scoreDisplayColor="orange" headerText="UIL Spelling Practice" correct={12} total={15} />
        </main>
    )
}