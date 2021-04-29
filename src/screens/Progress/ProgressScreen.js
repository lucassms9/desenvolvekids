import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import api from '~/services/api';

import ProgregressBar from '~/components/ProgregressBar';

const ProgressScreen = () => {
  const [progress, setProgress] = useState([]);

  const getQProgress = async () => {
    const { progress } = await api.post('questionarios/progresso');
    console.log(progress)
    if (progress) {
      setProgress(progress);
    }
  };

  useEffect(() => {
    getQProgress();
  }, []);

  return (
    <View>
      {progress.map((prog) => (
        <View style={{ marginTop: 15 }}>
          <View
            style={{ backgroundColor: '#fff', borderRadius: 5, padding: 10 }}>
            <View>
              <Text style={{ fontSize: 18 }}>{prog.categoria}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ProgregressBar percent={prog.percent}/>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProgressScreen;
