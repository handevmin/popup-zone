import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ address, onLocationSelect }) => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnJlajbzwXSN6xdDZLIAwp89DWlWWRzsU&libraries=places";
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.9780 },
      zoom: 15,
    });

    const searchBox = new window.google.maps.places.SearchBox(searchBoxRef.current);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchBoxRef.current);

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        new window.google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name,
        });

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        if (onLocationSelect) {
          onLocationSelect({
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });

      map.fitBounds(bounds);
    });

    if (address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          map.setCenter(location);
          new window.google.maps.Marker({
            map,
            position: location,
          });
        }
      });
    }
  };

  return (
    <div className="map-container">
      <input
        ref={searchBoxRef}
        type="text"
        placeholder="주소 검색..."
        className="map-search-input"
      />
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default GoogleMap;