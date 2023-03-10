import { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import * as S from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState([])

    const route = useRoute()
    const { group } = route.params as RouteParams

    return (
    <S.Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </S.Form>

      <S.HeaderList>  
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter 
            title={item}
            onPress={() => setTeam(item)} 
            isActive={item === team} 
            />
          )}
          horizontal
        />

        <S.NumberOfPlayers>
          {players.length}
        </S.NumberOfPlayers>
      </S.HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            onRemove={() => { }}  
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Não há pessoas nesse time."
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
      />      
    </S.Container>
  );
}
