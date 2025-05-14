import React from 'react';
import { useParams } from 'react-router-dom';
import { useItem } from '../hooks/useItem';
import { useBookingLogic } from '../hooks/useBookingLogic';
import Breadcrumbs from '../components/itemDetail/Breadcrumbs';
import ImageGallery from '../components/itemDetail/ImageGallery';
import ItemDetails from '../components/itemDetail/ItemDetails';
import OwnerInfo from '../components/itemDetail/OwnerInfo';
import BookingForm from '../components/itemDetail/BookingForm';
import LoadingState from '../components/itemDetail/LoadingState';
import NotFoundState from '../components/itemDetail/NotFoundState';

const ItemDetailPage = () => {
  const { id } = useParams();
  const { item, loading, error } = useItem(id);
  const bookingProps = useBookingLogic(item);

  if (loading) return <LoadingState />;
  if (error || !item) return <NotFoundState message={error || "Item not found"} />;

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs item={item} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ImageGallery images={item.images} />
            <ItemDetails item={item} />
            {item.owner && <OwnerInfo owner={item.owner} />}
          </div>
          <BookingForm item={item} {...bookingProps} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;