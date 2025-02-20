export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 6,
  }).format(price);
};

export const formatDate = (date: Date | string | null | undefined) => {
  if (typeof date == "string") {
    return new Date(date).toLocaleDateString();
  } else if (typeof date == "undefined") {
    return "";
  } else if (date == null) {
    return "";
  } else {
    return "";
  }
};

export const googleMapsParamGenerator = (direccion: string) => {
  const googleMapsBase = `https://www.google.com/maps?q=`;
  const splitDireccion = direccion.split(" ");

  return googleMapsBase + splitDireccion.reduce((rec, acc) => rec + "+" + acc);
};
