import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const WeddingEditPickupModal = ({
  visible,
  onClose,
  pickupAddress,
  setPickupAddress,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[{"flex":1,"justifyContent":"flex-end"}, { backgroundColor: 'rgba(15, 23, 42, 0.55)' }]}>
        <View style={{"backgroundColor":"#FFFFFF","borderTopLeftRadius":24,"borderTopRightRadius":24,"paddingHorizontal":20,"paddingTop":12,"paddingBottom":32,"maxHeight":"85%"}}>
          <View style={{"width":40,"height":4,"borderRadius":2,"backgroundColor":"#CBD5E1","alignSelf":"center","marginBottom":14}} />
          <View style={{"flexDirection":"row","alignItems":"center","justifyContent":"space-between","marginBottom":14}}>
            <Text style={{"fontSize":18,"fontWeight":"800","color":"#0F172A"}}>Edit Pickup Details</Text>
            <TouchableOpacity onPress={onClose} style={{"padding":4}}>
              <Ionicons name="close" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <Text style={{"fontSize":13,"fontWeight":"700","color":"#334155","marginBottom":6}}>Pickup Address</Text>
          <TextInput
            style={{"backgroundColor":"#F8FAFC","borderWidth":1,"borderColor":"#E2E8F0","borderRadius":12,"paddingHorizontal":14,"paddingVertical":10,"fontSize":14,"color":"#0F172A"}}
            value={pickupAddress}
            onChangeText={setPickupAddress}
            multiline
          />

          <TouchableOpacity
            style={{"backgroundColor":"#0F172A","paddingVertical":14,"borderRadius":14,"alignItems":"center","marginTop":18}}
            activeOpacity={0.85}
            onPress={onClose}
          >
            <Text style={{"fontSize":15,"fontWeight":"700","color":"#FFFFFF"}}>Save Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const WeddingTermsModal = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[{"flex":1,"justifyContent":"center","alignItems":"center","padding":24}, { backgroundColor: 'rgba(15, 23, 42, 0.6)' }]}>
        <View style={{"backgroundColor":"#FFFFFF","borderRadius":20,"padding":20,"width":"100%"}}>
          <Text style={{"fontSize":18,"fontWeight":"800","color":"#0F172A"}}>Wedding Rides Guidelines</Text>
          <Text style={[{"fontSize":13,"color":"#475569","lineHeight":18,"marginBottom":12}, { marginTop: 8 }]}>
            • Clean, chauffeur-driven luxury rides for brides, grooms and wedding guests.
            {'\n'}• On-time guaranteed pickup for marriage ceremonies and reception venues.
            {'\n'}• Multiple vehicle booking support available on advance request.
            {'\n'}• 24/7 dedicated support helpline for all wedding rides.
          </Text>

          <TouchableOpacity
            style={{"backgroundColor":"#0F172A","paddingVertical":12,"borderRadius":12,"alignItems":"center"}}
            activeOpacity={0.85}
            onPress={onClose}
          >
            <Text style={{"fontSize":14,"fontWeight":"700","color":"#FFFFFF"}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
