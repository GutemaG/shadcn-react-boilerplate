import {
  getUser,
  getUserPosts,
  Post,
  PostPaginationResponse,
  User,
} from "@/lib/api/userApi";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { useFetchData } from "@/hooks/useFetchData";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardContentInfo from "./components/CardContentInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ellipsis, ThumbsDown, ThumbsUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "@/components/ui/hover-card";
import TableLoadingSkeleton from "@/components/ui/TableLoadingSkeleton";

const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  //   const navigate = useNavigate();
  const fetchUser = useCallback(() => getUser(id ?? ""), [id]);
  const { data, loading, error } = useFetchData<User>(fetchUser);
  const fetchUserPosts = useCallback(() => getUserPosts(id ?? ""), [id]);
  const { data: posts, loading: isfetchingPostLoading } =
    useFetchData<PostPaginationResponse<Post>>(fetchUserPosts);

  if (!id) return <>Error Page</>;
  if (loading) return <>Loading</>;
  if (error) return <>error ... {error}</>;
  return (
    <>
      <div className="flex gap-2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Main Information</CardTitle>
            <CardDescription>{data?.firstName} main info</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <CardContentInfo
                label="User Name"
                value={data?.username ?? ""}
                separator
              />
              <CardContentInfo
                label="First Name"
                value={data?.firstName ?? ""}
                separator
              />
              <CardContentInfo
                label="Last Name"
                value={data?.lastName ?? ""}
                separator
              />
              <CardContentInfo
                label="Maiden Name"
                value={data?.maidenName ?? ""}
                separator
              />
              <CardContentInfo
                label="Gender"
                value={data?.gender ?? ""}
                separator
              />
              <CardContentInfo
                label="Email"
                value={data?.email ?? ""}
                separator
              />
              <CardContentInfo
                label="Maiden Name"
                value={data?.maidenName ?? ""}
                separator
              />
              <CardContentInfo
                label="Phone"
                value={data?.phone ?? ""}
                separator
              />
              <CardContentInfo
                label="Birth Date"
                value={data?.birthDate ?? ""}
                separator
              />
              <CardContentInfo
                label="Eye Color"
                value={data?.eyeColor ?? ""}
                separator
              />
              <CardContentInfo label="Age" value={data?.age ?? ""} separator />
              <CardContentInfo
                label="Blood Group"
                value={data?.bloodGroup ?? ""}
                separator
              />
            </div>
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <CardContentInfo
                label="Country"
                value={data?.address.country}
                separator
              />
              <CardContentInfo
                label="State"
                value={data?.address.state}
                separator
              />
              <CardContentInfo
                label="State Code"
                value={data?.address.stateCode}
                separator
              />
              <CardContentInfo
                label="City"
                value={data?.address.city}
                separator
              />
              <CardContentInfo
                label="Postal Code"
                value={data?.address.postalCode}
                separator
              />
              <CardContentInfo
                label="Address"
                value={data?.address.address}
                separator
              />
              <CardContentInfo
                label="Coordinate"
                value={`${data?.address.coordinates.lat},${data?.address.coordinates.lng}`}
                separator
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {isfetchingPostLoading && <TableLoadingSkeleton />}
      <div className="mt-5">
        <h3 className="text-2xl">Posts by {data?.username}</h3>
        <div className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead className="font-bold text-xl">Title</TableHead>
                <TableHead className="font-bold text-xl">Body</TableHead>
                <TableHead className="font-bold text-xl">Tags</TableHead>
                <TableHead className="font-bold text-xl">Reactions</TableHead>
                <TableHead className="font-bold text-xl">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.posts.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {post.body.substring(0, 50)}
                    {post.body.length > 50 && (
                      <>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="link">
                              <Ellipsis size={18} />
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              {post.body}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Label className="flex gap-2">
                        <ThumbsUp size={18} />
                        {post.reactions.likes}
                      </Label>
                      <Label className="flex gap-2">
                        <ThumbsDown size={18} />
                        {post.reactions.dislikes}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                </TableRow>
              ))}
              {posts?.posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
