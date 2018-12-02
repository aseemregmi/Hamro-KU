export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
      });
    } else {
      reject('Location Not Available');
    }
  });
};
