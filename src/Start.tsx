import { Button, Stack, Text } from "@mantine/core";

export default function Start({ onStart }: { onStart: () => void }) {
    return (
        <Stack>
            <Text>Start </Text>
            < Button onClick={onStart}>Start</Button>
        </Stack>
    )
}